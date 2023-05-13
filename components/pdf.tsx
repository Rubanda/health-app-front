'use client'
import { ArrowDownTrayIcon, ClipboardDocumentIcon, ShareIcon } from '@heroicons/react/24/outline'
import { Card, Flex, TextInput } from '@tremor/react'
import Image from 'next/image'
import React from 'react'
import TezosLogo from "../../public/SVG/TezosLogo_Icon_Blue.svg"
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline';
import axios from 'axios'
// import { TezosOperationType } from "@airgap/beacon-sdk";
// import { getActiveAccount, dAppClient } from './beacon'
import config from '@/config/wallet'
type ModalProps = {
  wallet: string
  isOpen: boolean;
  closeModal: () => void,
  chartData: any,
  token: string
  report: { pdf: string }
}

const isEmail = (email: string) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);


export default function ModalPdf({ wallet, isOpen, closeModal, chartData, token, report }: ModalProps) {

  const [email, setEmail] = React.useState<string>('')
  const [errors, setErrors] = React.useState<boolean>(false);
  const handleOnChange = (e: any) => {
    e.preventDefault()
    setEmail(e.target.value)
    // console.log("email", email)
    // check if the email is valid
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = regex.test(email);

    setErrors(!isValid)
  }
  const handleSendEmail = async () => {
    const report = await axios.post(`${process.env.BACKEND_URL}/api/user/email?toEmail=${email}`, {}, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    if (report.status === 200) {
      setEmail('')
      closeModal()
    }
  }
  // const requestOperation = async (pdfFile: string) => {
  //   try {
  //     const activeAccount = await getActiveAccount();
  //     console.log('[activeAccount]', activeAccount)
  //     const result = await dAppClient.requestOperation({
  //       operationDetails: [
  //         {
  //           kind: TezosOperationType.TRANSACTION,
  //           amount: "1",
  //           destination: config.contractAddress,
  //           parameters: {
  //             entrypoint: 'set_value',
  //             value: {
  //               string: pdfFile,
  //             },
  //           },
  //         },
  //       ],
  //     });
  //     await axios.patch(`${process.env.BACKEND_URL}/api/user/${chartData.id}`, { hashEdTransaction: result.transactionHash }, {
  //       headers: {
  //         Authorization: 'Bearer ' + token
  //       }
  //     })
  //     return result
  //   } catch (error) {
  //     return error
  //   }
  // };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    <Flex>
                      <div className="mt-2">

                      </div>
                      <div className="mt-2">

                        <XMarkIcon className='text-black/76 w-6 h-6 cursor-pointer' onClick={closeModal} />
                      </div>
                    </Flex>
                    <Card
                      className=" mt-6"
                    >
                      <Flex className="gap-3">

                        <TextInput className="my-6" placeholder={report?.pdf ? report?.pdf : 'generate report...'} />
                        {report && <a href={report.pdf} target="_blank" download><ArrowDownTrayIcon className="h-7 w-7 " /></a>}
                      </Flex>
                      <TextInput
                        className={`mb-6  !focus:outline-none `}
                        name='email' onChange={handleOnChange} error={errors} placeholder='Enter email' />
                      {report && (
                        <>
                          <Flex>
                            <button
                              disabled={isEmail(email) ? false : true}
                              onClick={handleSendEmail}
                              className="flex items-center  bg-black text-white p-1 px-2 rounded-lg text-base font-semibold
                          hover:bg-white hover:text-black border-2 border-solid border-transparent hover:border-black disabled:cursor-not-allowed disabled:opacity-75
                          "
                            >
                              <ShareIcon className="h-6 w-6 mr-3" /> Share
                            </button>
                            {/* <button
                              onClick={() => {
                                requestOperation(report?.pdf);
                                closeModal()
                              }}
                              disabled={wallet ? false : true}
                              className="flex items-center  bg-black text-white p-1 px-2 rounded-lg text-base font-semibold
                          hover:bg-white hover:text-black border-2 border-solid border-transparent hover:border-black disabled:cursor-not-allowed disabled:opacity-75
                          "
                            >
                              <Image src={TezosLogo} alt="Tezos logo" className="flex items justify-center h-6 w-6 mr-3" /> Tezos
                            </button> */}
                          </Flex>
                          {!wallet && <p className="text-red-500 text-sm">Please connect your wallet</p>}
                        </>
                      )}

                    </Card>
                  </Dialog.Title>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

