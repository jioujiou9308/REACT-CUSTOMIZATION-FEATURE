import React from 'react'
import { memo } from 'react'
const Child = memo(({ name, }) => {
    console.log('渲染child子元件!!')
    return (
        <div>Child123{name}</div>
    )
})

export default Child