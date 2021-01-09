import React from 'react'
// vem do next, olhar a documentacao para entender melhor
import Link from 'next/link'
import Image from 'next/image'

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <a>
        <Image src="/assets/logo-soomi.png" alt="Logo OneBitGames" width={220} height={40} />
      </a>
    </Link>
  )
}

export default Logo