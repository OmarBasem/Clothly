import MockAsyncStorage from 'mock-async-storage';
import * as ReactNative from 'react-native';
import 'react-native-gesture-handler/jestSetup';

const mockImpl = new MockAsyncStorage();
jest.mock('@react-native-async-storage/async-storage', () => mockImpl);


// React Native
jest.doMock('react-native', () => {
    const {
        Platform,
        StyleSheet,
        PermissionsAndroid,
        ImagePickerManager,
        requireNativeComponent,
        Alert: RNAlert,
        InteractionManager: RNInteractionManager,
        NativeModules: RNNativeModules,
        Linking: RNLinking,
    } = ReactNative;

    const Alert = {
        ...RNAlert,
        alert: jest.fn(),
    };

    const InteractionManager = {
        ...RNInteractionManager,
        runAfterInteractions: jest.fn((cb) => cb()),
    };

    const NativeModules = {
        ...RNNativeModules,
        UIManager: {
            RCTView: {
                directEventTypes: {},
            },
        },
        // BlurAppScreen: () => true,
        PlatformConstants: {
            forceTouchAvailable: false,
        },
        RNGestureHandlerModule: {
            State: {
                BEGAN: 'BEGAN',
                FAILED: 'FAILED',
                ACTIVE: 'ACTIVE',
                END: 'END',
            },
        },
        KeyboardObserver: {},
        RNCNetInfo: {
            getCurrentState: jest.fn().mockResolvedValue({isConnected: true}),
            addListener: jest.fn(),
            removeListeners: jest.fn(),
            addEventListener: jest.fn(),
        },
        RNKeychainManager: {
            SECURITY_LEVEL_ANY: 'ANY',
            SECURITY_LEVEL_SECURE_SOFTWARE: 'SOFTWARE',
            SECURITY_LEVEL_SECURE_HARDWARE: 'HARDWARE',
        },
        StatusBarManager: {
            getHeight: jest.fn(),
        },
        RNPermissions: {},
        RNFBAnalyticsModule: {
            logEvent: jest.fn(),
        },
        RNFBAppModule: {
            NATIVE_FIREBASE_APPS: [
                {
                    appConfig: {
                        name: '[DEFAULT]',
                    },
                    options: {},
                },

                {
                    appConfig: {
                        name: 'secondaryFromNative',
                    },
                    options: {},
                },
            ],
            FIREBASE_RAW_JSON: '{}',
            addListener: jest.fn(),
            eventsAddListener: jest.fn(),
            eventsNotifyReady: jest.fn(),
            removeListeners: jest.fn(),
        },
        RNFBAuthModule: {
            APP_LANGUAGE: {
                '[DEFAULT]': 'en-US',
            },
            APP_USER: {
                '[DEFAULT]': 'jestUser',
            },
            addAuthStateListener: jest.fn(),
            addIdTokenListener: jest.fn(),
            useEmulator: jest.fn(),
        },
        RNFBCrashlyticsModule: {},
        RNFBDatabaseModule: {
            on: jest.fn(),
            useEmulator: jest.fn(),
        },
        RNFBFirestoreModule: {
            settings: jest.fn(),
            documentSet: jest.fn(),
        },
        RNFBMessagingModule: {
            onMessage: jest.fn(),
        },
        RNFBPerfModule: {},
        RNFBStorageModule: {
            useEmulator: jest.fn(),
        },
    };

    const Linking = {
        ...RNLinking,
        openURL: jest.fn().mockImplementation(
            () => Promise.resolve(''),
        ),
    };

    return Object.setPrototypeOf({
        Platform: {
            ...Platform,
            OS: 'ios',
            Version: 12,
        },
        StyleSheet,
        PermissionsAndroid,
        ImagePickerManager,
        requireNativeComponent,
        Alert,
        InteractionManager,
        NativeModules,
        Linking,
    }, ReactNative);
});



jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');



const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => mockedNavigate
}));

jest.mock(
    'react-native-vector-icons/Entypo',
    () => 'MockedEntypo',
);

jest.mock(
    'react-native-vector-icons/AntDesign',
    () => 'MockedAntDesign',
);

jest.mock(
    'react-native-vector-icons/MaterialIcons',
    () => 'MockedMaterialIcons',
);



let logs = [];
let warns = [];
let errors = [];
beforeAll(() => {
    console.originalLog = console.log;
    console.log = jest.fn((...params) => {
        console.originalLog(...params);
        logs.push(params);
    });

    console.originalWarn = console.warn;
    console.warn = jest.fn((...params) => {
        console.originalWarn(...params);
        warns.push(params);
    });

    console.originalError = console.error;
    console.error = jest.fn((...params) => {
        console.originalError(...params);
        errors.push(params);
    });
});

beforeEach(() => {
    logs = [];
    warns = [];
    errors = [];
});

global.requestAnimationFrame = (callback) => {
    setTimeout(callback, 0);
};


jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('redux-persist', () => {
  const real = jest.requireActual('redux-persist');
  return {
    ...real,
    persistReducer: jest
      .fn()
      .mockImplementation((config, reducers) => reducers),
  };
});

jest.mock('react-native-screens', () => ({
  ...jest.requireActual('react-native-screens'),
  enableScreens: jest.fn(),
}));


// jest.mock('react-redux', () => {
//     const ActualReactRedux = jest.requireActual('react-redux');
//     return {
//         ...ActualReactRedux,
//         useSelector: jest.fn().mockImplementation(() => {
//             return mockState;
//         }),
//     };
// });

