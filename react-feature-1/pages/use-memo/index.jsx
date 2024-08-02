import React, { useState } from 'react'
import Child from '../../component/useMemo/Child'
const index = () => {
    const [value, setValue] = useState('')
    const [value2, setValue2] = useState(['asdf', 'asdfw', { name: 'wefa' }, { asdf: { age: 12 } }])

    const handle = () => {
        console.log('test')
    }
    return (
        <div>
            <label>
                <input type='text' onChange={(e) => {
                    setValue(e.target.value)
                    setValue2(JSON.parse(JSON.stringify(value2)))
                }} />
                輸入你的值
            </label>
            <Child name={'namedd'} another={value2} />
        </div>
    )
}

export default index