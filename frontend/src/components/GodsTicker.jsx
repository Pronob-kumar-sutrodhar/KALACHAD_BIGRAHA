import { FaOm } from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'

const GOD_NAMES_BN = [
  'হরে কৃষ্ণ হরে কৃষ্ণ',
  'জয় শ্রী রাধা মাধব',
  'ওঁ নমো ভগবতে বাসুদেবায়',
  'গোবিন্দ জয় জয় গোপাল জয় জয়',
  'রাধে রাধে',
  'জয় জগন্নাথ বলদেব সুভদ্রা',
  'শ্রীমদ্ভগবদ্গীতা মাহাত্ম্য',
  'ওঁ নমঃ শিবায়',
  'জয় শ্রী রাম',
  'মহামৃত্যুঞ্জয়',
  'জয় গোপাল গিরিধারী',
  'শ্যামসুন্দর মুরলীধর',
  'জয় মা দুর্গা',
  'ওঁ গং গণপতয়ে নমঃ',
]

const GOD_NAMES_EN = [
  'Hare Krishna Hare Krishna',
  'Sri Radha Madhava Ki Jai',
  'Om Namo Bhagavate Vasudevaya',
  'Govinda Jaya Jaya Gopala Jaya Jaya',
  'Radhe Radhe',
  'Jai Jagannath Baladev Subhadra',
  'Srimad Bhagavad Gita',
  'Om Namah Shivaya',
  'Jai Shri Ram',
  'Mahamrityunjaya',
  'Jai Gopal Giridhari',
  'Shyam Sundar Murli Manohar',
  'Jai Maa Durga',
  'Om Gam Ganapataye Namaha',
]

export default function GodsTicker() {
  const { language } = useLanguage()
  const names = language === 'bn' ? GOD_NAMES_BN : GOD_NAMES_EN

  return (
    <div className="kr-gods-marquee border-y border-white/10 select-none shadow-inner" aria-label="Sacred Deities and Mantras">
      <div className="kr-gods-track">
        {/* First Loop Set */}
        {names.map((name, i) => (
          <div key={`set1-${i}`} className="inline-flex items-center">
            <span className="font-lora text-sm md:text-[15px] font-semibold tracking-[2px] text-white/90 hover:text-temple-gold transition-colors duration-200 px-6 cursor-default">
              {name}
            </span>
            <FaOm className="text-temple-accent text-xs md:text-sm opacity-80" />
          </div>
        ))}
        {/* Duplicate Set for Seamless 50% Loop */}
        {names.map((name, i) => (
          <div key={`set2-${i}`} className="inline-flex items-center">
            <span className="font-lora text-sm md:text-[15px] font-semibold tracking-[2px] text-white/90 hover:text-temple-gold transition-colors duration-200 px-6 cursor-default">
              {name}
            </span>
            <FaOm className="text-temple-accent text-xs md:text-sm opacity-80" />
          </div>
        ))}
      </div>
    </div>
  )
}
