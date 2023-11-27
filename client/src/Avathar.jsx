import React from 'react'

function Avathar({username,userId}) {
    const colors = ['bg-yellow-300','bg-teal-300','bg-purple-300','bg-blue-300','bg-red-300']

    const userIdBase10 = parseInt(userId,10)
    const colorIndex = userIdBase10 % colors.length
    const color = colors[colorIndex]
  return (
    <div className={`bg-red-400 w-8 h-8 flex rounded-full items-center sm:h-14 w-14 ${color}`}>
        <div className='text-center text-white font-semibold uppercase w-full text-3xl'>
            {username[0]}
        </div>


    </div>
  )
}

export default Avathar