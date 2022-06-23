import {defaultCategory} from "../app/reducers/products";

const platform = device.getPlatform()

describe('End-to-End testing', () => {
    beforeAll(async () => {
        await device.launchApp();
    });

    it('should render HomeScreen and products list', async () => {
        await expect(element(by.id('HomeScreen'))).toBeVisible()
        await waitFor(element(by.id(`${defaultCategory}-clothing`))).toBeVisible().withTimeout(1000)
        await waitFor(element(by.id('item-0-0'))).toBeVisible().withTimeout(1000)
    })

    it('should render TopBar and change category', async () => {
        await expect(element(by.id('TopBar'))).toBeVisible()
        await element(by.id('WOMEN')).tap()
        await waitFor(element(by.id(`WOMEN-clothing`))).toBeVisible().withTimeout(1000)
    })

    it('should render SearchBar and filter products', async () => {
        await expect(element(by.id('SearchBar'))).toBeVisible()
        await element(by.id('SearchBar')).typeText('Jacket')
        await expect(element(by.id('item-0-0'))).toBeVisible()

        if (platform === 'ios') {
            const attr = await element(by.id('title-0-0')).getAttributes()
            if (!attr.text.includes('Jacket'))
                throw new Error('Items not filtered correctly')
        } else {
            // Detox on android does not support getAttributes() se we need to search for an exact string
            await expect(element(by.text('Parka Jacket Women Cotton'))).toExist()
        }
    })

    it('should navigate to ProductScreen, and change variables', async () => {
        await element(by.id('item-0-0')).tap()
        if (platform === 'android') // another tap needed for Android to lose focus off the keyboard
            await element(by.id('item-0-0')).tap()
        await waitFor(element(by.id('ProductScreen'))).toBeVisible().withTimeout(3000)
        await expect(element(by.id('size-1'))).toBeVisible()
        await element(by.id('size-1')).tap()

        // scroll to colors if it was not visible
        await waitFor(element(by.id('color-1'))).toBeVisible().whileElement(by.id('productScroll')).scroll(50, 'down')
        await expect(element(by.id('color-1'))).toBeVisible()
        await element(by.id('color-1')).tap()
    })

    it('should open and close image in lightbox', async () => {
        await expect(element(by.text('×'))).not.toExist() // using the '×' button to check whether the image is in fullscreen
        await element(by.id('openImage')).tap()
        await waitFor(element(by.text('×'))).toExist().withTimeout(1000)
        await element(by.text('×')).tap()
        await expect(element(by.text('×'))).not.toExist()
    })


    it('should select a product from more products', async () => {
        let attrs1, attrs2;
        if (platform === 'ios')
            attrs1 = await element(by.id('productScroll')).getAttributes()
        else // Detox on android does not support getAttributes() se we need to search for an exact string
            await expect(element(by.text('Parka Jacket Women Cotton'))).toExist()
        await element(by.id('productScroll')).scrollTo('bottom')
        await expect(element(by.id('more-0'))).toBeVisible()
        await element(by.id('more-0')).tap()
        if (platform === 'ios') {
            attrs2 = await element(by.id('productScroll')).getAttributes()
            if (attrs1.label === attrs2.label)
                throw new Error('Did not select a `more` product')
        } else
            await expect(element(by.text('Parka Jacket Women Cotton'))).not.toExist()
    })

    it('should navigate to other tabs and have content rendered', async () => {
        await element(by.id('wishlist-tab')).tap()
        await expect(element(by.id('WishlistScreen'))).toBeVisible()

        await element(by.id('cart-tab')).tap()
        await expect(element(by.id('CartScreen'))).toBeVisible()

        await element(by.id('profile-tab')).tap()
        await waitFor(element(by.id('ProfileScreen'))).toBeVisible().withTimeout(1000)
    })
});
