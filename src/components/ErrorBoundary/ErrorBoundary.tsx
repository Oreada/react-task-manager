import { Button, Stack, Typography } from '@mui/material';
import {
  Component,
  Dispatch,
  ErrorInfo,
  FC,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROOT_PATH } from 'router/constants';

import { ReactComponent as ErrorSvg } from './assets/back-for-error.svg';
import { BUTTON_TEXT, TITLE } from './constants';

interface IErrorInnerProps {
  children: ReactNode;
  hasError: boolean;
  setHasError: Dispatch<SetStateAction<boolean>>;
  goHome: () => void;
}

interface IErrorBoundaryState {
  hasError: boolean;
}

interface IErrorBoundaryProps {
  children: ReactNode;
}

const ErrorBoundary: FC<IErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const goHome = () => navigate(ROOT_PATH);

  useEffect(() => {
    if (hasError) {
      setHasError(false);
    }
  }, [location.key]);
  return (
    <ErrorBoundaryInner hasError={hasError} setHasError={setHasError} goHome={goHome}>
      {children}
    </ErrorBoundaryInner>
  );
};

class ErrorBoundaryInner extends Component<IErrorInnerProps, IErrorBoundaryState> {
  constructor(props: IErrorInnerProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: Error) {
    return { hasError: true };
  }

  componentDidUpdate(prevProps: IErrorInnerProps, _previousState: IErrorBoundaryState) {
    if (!this.props.hasError && prevProps.hasError) {
      this.setState({ hasError: false });
    }
  }

  componentDidCatch(_error: Error, _errorInfo: ErrorInfo) {
    this.props.setHasError(true);
  }

  render() {
    return this.state.hasError ? (
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        width="100%"
        height="100%"
        maxWidth="lg"
        spacing={4}
        padding={4}
        margin="0 auto"
      >
        <Typography variant="h2" component="p" align="center">
          {TITLE}
        </Typography>
        <ErrorSvg
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            fill: '#D85841',
          }}
        />
        <Button variant="outlined" color="substitute" size="large" onClick={this.props.goHome}>
          <Typography variant="h4" component="p">
            {BUTTON_TEXT}
          </Typography>
        </Button>
      </Stack>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
