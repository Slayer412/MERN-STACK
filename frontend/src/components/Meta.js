import React from 'react'
import {Helmet} from 'react-helmet'

const Meta = ({ description, keywords, title }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keyword' content={keywords} />
            
        </Helmet>
    )
}

Meta.defaultProps = {
    title:'Welcome To TEchEmarketZ',
    description:'We sell best produtcs at best price',
    keywords:'Electronics, buy electronics items, best services'
}

export default Meta
