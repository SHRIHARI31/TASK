import React from 'react'
import Header from './Header'
import Table from './Table'


const DashBoard = () => {
    return (
        <main className=" w-full border-black  p-5 md:p-20">
            <Header />
            <Table />
        </main>
    )
}

export default DashBoard