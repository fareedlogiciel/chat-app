import { HomePage, ProfilePage } from "./pages";
import { withNavigationWatcher } from "./contexts/navigation";

const routes = [
  {
    path: "/profile",
    element: ProfilePage,
  },
  {
    path: "/",
    element: HomePage,
  },
  {
    path: "/:conversationId",
    element: HomePage,
  },
];

export default routes.map((route) => {
  return {
    ...route,
    element: withNavigationWatcher(route?.element, route?.path),
  };
});
