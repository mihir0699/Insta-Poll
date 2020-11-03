import React from 'react'
import {Button} from 'antd'
import {Link} from 'react-router-dom'
import {HomeTwoTone } from '@ant-design/icons'

const Not_found = () => {
    return (
        <div>
            <img src={"https://www.flaticon.com/svg/static/icons/svg/1147/1147129.svg"} className="not_img"/>
            <br/><Link to="/"><Button type="primary" size="large">Return <HomeTwoTone /></Button></Link>
        </div>
    )
}

export default Not_found
