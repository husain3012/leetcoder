import React from 'react'

const TruncatedText = ({ str, n, isMobile }:{str:string, n:number, isMobile:boolean}) => {
    if (!isMobile || str.length <= n) return <span>{str}</span>;
    if (str.length > n) {
      return <>{str.slice(0, n - 1)}&hellip;</>;
    }
}

export default TruncatedText