import CountryPlaybook from '../../components/CountryPlaybookV2'
import styles from './country-playbook.module.css'

export const metadata = {
  title: 'Country Playbook | The Cultural Playbook',
  description: 'An interactive business and cultural country playbook.'
}

export default function CountryPlaybookPage() {
  return <div className={styles.page}><CountryPlaybook /></div>
}
