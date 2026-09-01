import PageBanner from '../components/PageBanner'
import GodsTicker from '../components/GodsTicker'
import CommitteeSection from '../components/CommitteeSection'
import { useLanguage } from '../context/LanguageContext'

export default function CommitteePage() {
  const { language } = useLanguage()

  return (
    <div className="w-full">
      <PageBanner
        title={
          language === 'bn'
            ? 'মন্দির পরিচালনা কমিটি পরিষদ'
            : 'Mandir Executive Committee'
        }
        subtitle={
          language === 'bn'
            ? 'শ্রী শ্রী কালাচাঁদ বিগ্রহ ইউনিয়ন কেন্দ্রীয় মন্দির'
            : 'Sri Sri Kalachand Bigraha Central Temple'
        }
        breadcrumb={[
          {
            label:
              language === 'bn' ? 'পরিচালনা কমিটি' : 'Executive Committee',
          },
        ]}
      />
      <GodsTicker />

      {/* Main Committee Section */}
      <CommitteeSection showTitle={false} className="min-h-screen" />
    </div>
  )
}
