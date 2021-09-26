import type { NextPage } from 'next'
import Head from 'next/head'
import { ChatAltIcon } from '@heroicons/react/solid'
import { DotsVerticalIcon } from '@heroicons/react/outline'
import React from 'react'

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className='flex justify-center min-h-screen text-white bg-gray-900'>
				<div className='flex flex-1 h-full max-w-6xl min-h-screen py-4 rounded'>
					<div className='flex flex-col flex-1 max-w-xs overflow-y-auto bg-gray-800 border-r border-gray-900'>
						<div className='flex items-center justify-between h-16 px-2'>
							<div className='flex items-center justify-center w-10 h-10 text-xs bg-red-500 rounded-full'>
								avatar
							</div>
							<div className='flex gap-2'>
								<button>
									<ChatAltIcon className='w-7 h-7' />
								</button>
								<button>
									<DotsVerticalIcon className='w-7 h-7' />
								</button>
							</div>
						</div>
						<div className='p-2'>
							<div className='relative'>
								<input
									className='flex items-center w-full h-10 pl-6 text-white bg-gray-900 rounded-md outline-none'
									placeholder='search'
								/>
							</div>
						</div>
						<div className='flex flex-col p-2'>
							<div className='flex gap-2'>
								<div className='flex items-center justify-center flex-shrink-0 w-12 h-12 text-xs bg-red-500 rounded-full'>
									avatar
								</div>
								<div className='flex flex-col flex-1 w-full truncate'>
									<div>Mark Goldbridge</div>
									<div className='truncate'>
										Lorem ipsum dolor sit amet, consectetur adip
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='flex flex-col flex-1 bg-gray-800'>
						<div className='flex items-center h-16 px-2 border-b border-gray-900'>
							<div className='flex items-center space-x-2'>
								<div className='flex items-center justify-center flex-shrink-0 w-12 h-12 text-xs bg-red-500 rounded-full'>
									avatar
								</div>
								<div>Mark Goldbridge</div>
							</div>
						</div>
						<div className='flex flex-col justify-end flex-1 px-8 pb-2 space-y-3 text-sm'>
							<div>
								<div className='max-w-[65%]'>
									<div className='p-2 pl-8 bg-gray-700 rounded-lg max-w-max'>
										Lorem ipsum dolor sit amet.
									</div>
								</div>
							</div>
							<div className='flex flex-row-reverse'>
								<div className='max-w-[65%]'>
									<div className='p-2 pr-8 text-right whitespace-pre-wrap bg-blue-800 rounded-lg max-w-max'>
										Lorem ipsum dolor sit amet consectetur adipisicing elit.
										Minima iusto em sequi deserunt molestiae delectus.
									</div>
								</div>
							</div>
						</div>
						<div className='flex items-center p-2 overflow-y-hidden border-t border-gray-900'>
							<div
								contentEditable
								className='w-full p-2 bg-gray-900 rounded-lg max-h-[100px] overflow-y-auto'
							></div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Home
