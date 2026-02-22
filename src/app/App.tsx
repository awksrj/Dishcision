import { AppProvider } from './store/context';
import SignInInteractive from './components/SignInInteractive';

export default function App() {
  return (
    <AppProvider>
      <SignInInteractive />
    </AppProvider>
  );
}
