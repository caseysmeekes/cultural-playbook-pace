import './globals.css'
import QuickActions from '../components/QuickActions'

export const metadata = {
  title: 'The Cultural Playbook | PACE',
  description: 'Cultural Intelligence and PACE preparation tool'
}

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}<QuickActions /></body></html>
}
