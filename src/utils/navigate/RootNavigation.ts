import {createNavigationContainerRef} from '@react-navigation/native';
import {RootStackParamList} from 'navigation/Routes';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function RootNavigation<RouteName extends keyof RootStackParamList>(
  ...args: RouteName extends unknown
    ? undefined extends RootStackParamList[RouteName]
      ?
          | [screen: RouteName]
          | [screen: RouteName, params: RootStackParamList[RouteName]]
      : [screen: RouteName, params: RootStackParamList[RouteName]]
    : never
) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(...args);
  }
}
