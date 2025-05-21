
import { redirect } from 'next/navigation';

export default function AppRootPage() {
  redirect('/dashboard');
  // The redirect function throws a NEXT_REDIRECT error, 
  // so execution stops here and this return is not strictly necessary.
  return null; 
}
