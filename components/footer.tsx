import React from 'react'
import Image from 'next/image';
import de from '../locales/de/translationDe.json'
import en from '../locales/en/translationEn.json';
import fr from '../locales/fr/translationFr.json';
import hi from '../locales/hi/translationHi.json';
import ja from '../locales/ja/translationJa.json';
import ru from '../locales/ru/translationRu.json';
import { useRouter } from 'next/router';

const locales = { en, de, fr, hi, ja, ru };

export default function Footer() {

    const router = useRouter();
    const { locale } = router;
    const t = locale ? locales[locale] : locales['en'];

    return (
        <div className="flex text-white justify-center text-xl py-3 items-center w-full mx-auto z-50">
            made {t.footerWith} <Image className="w-8 mb-1" height="25" width="25" src="/love.png" alt="Love" />, &nbsp; {t.footerBy} &nbsp;<a className="underline" href="" target="_blank" rel="noreferrer">{t.footerMyName}</a>
        </div>
    )
}
