export interface RouteProps {
  exact?: boolean;
  path: string;
  children: JSX.Element;
}

const Route = ({ children }: RouteProps) => children;

Route.displayName = 'Route';

export default Route;
