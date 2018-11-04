import React from 'react'
import Helmet from 'react-helmet'
import '../../assets/scss/init.scss'
import Apple57 from '../../assets/favicons/apple-icon-57x57.png'
import Apple60 from '../../assets/favicons/apple-icon-60x60.png'
import Apple72 from '../../assets/favicons/apple-icon-72x72.png'
import Apple76 from '../../assets/favicons/apple-icon-76x76.png'
import Apple114 from '../../assets/favicons/apple-icon-114x114.png'
import Apple120 from '../../assets/favicons/apple-icon-120x120.png'
import Apple144 from '../../assets/favicons/apple-icon-144x144.png'
import Apple152 from '../../assets/favicons/apple-icon-152x152.png'
import Apple180 from '../../assets/favicons/apple-icon-180x180.png'
import Andriod192 from '../../assets/favicons/android-icon-192x192.png'
import ThirtyTwo from '../../assets/favicons/favicon-32x32.png'
import NinetySix from '../../assets/favicons/favicon-96x96.png'
import Sixteen from '../../assets/favicons/favicon-16x16.png'
import Ms144 from '../../assets/favicons/ms-icon-144x144.png'

class Layout extends React.Component {
  render() {
    const { children } = this.props

    return (
      <div className="layout">
        <Helmet defaultTitle="Blog by Aubrey Oosthuizen">
          <link rel="apple-touch-icon" sizes="57x57" href={Apple57} />
          <link rel="apple-touch-icon" sizes="60x60" href={Apple60} />
          <link rel="apple-touch-icon" sizes="72x72" href={Apple72} />
          <link rel="apple-touch-icon" sizes="76x76" href={Apple76} />
          <link rel="apple-touch-icon" sizes="114x114" href={Apple114} />
          <link rel="apple-touch-icon" sizes="120x120" href={Apple120} />
          <link rel="apple-touch-icon" sizes="144x144" href={Apple144} />
          <link rel="apple-touch-icon" sizes="152x152" href={Apple152} />
          <link rel="apple-touch-icon" sizes="180x180" href={Apple180} />
          <link rel="icon" type="image/png" sizes="192x192" href={Andriod192} />
          <link rel="icon" type="image/png" sizes="32x32" href={ThirtyTwo} />
          <link rel="icon" type="image/png" sizes="96x96" href={NinetySix} />
          <link rel="icon" type="image/png" sizes="16x16" href={Sixteen} />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-TileImage" content={Ms144} />
          <meta name="theme-color" content="#ffffff" />
        </Helmet>
        {children}
      </div>
    )
  }
}

export default Layout
