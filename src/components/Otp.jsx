import React, { useEffect, useRef, useState } from 'react'
import './OtpStyle.scss'
import { toast } from 'react-toastify'
const Otp = () => {
    const [OtpNumber, setOtpNumber] = useState({
        input1: '',
        input2: '',
        input3: '',
        input4: '',
    })

    const [numberRandom, setRanDomNumber] = useState(null)
    const [countDown, setCountDown] = useState(30)

    const idTimerRef = useRef()
    const inputRef1 = useRef()
    const toastId = useRef()

    const generateNumber = () => {
        const val = Math.floor(1000 + Math.random() * 9000)
        setRanDomNumber(val)
        setCountDown(30)
        idTimerRef.current = setInterval(() => {
            setCountDown((prev) => prev - 1)
        }, 1000)
    }

    console.log(idTimerRef.current)

    useEffect(() => {
        generateNumber()
        toast.info('You have.')
    }, [])

    useEffect(() => {
        if (countDown <= 0) {
            clearTimeout(idTimerRef.current)
        }
        console.log(inputRef1.current)
    }, [countDown])

    const handleChangeInput = (event, id) => {
        OtpNumber[id] = event.target.value
        setOtpNumber({ ...OtpNumber })
    }

    console.log('Re-render', countDown)
    console.log(OtpNumber)

    const clearValueInput = () => {
        setOtpNumber({
            input1: '',
            input2: '',
            input3: '',
            input4: '',
        })
    }

    const confirmOTP = () => {
        const result =
            OtpNumber.input1 +
            OtpNumber.input2 +
            OtpNumber.input3 +
            OtpNumber.input4

        if (parseInt(result) === numberRandom) {
            console.log('success my friend')
            clearValueInput()
            clearTimeout(idTimerRef.current)
            setCountDown(30)
            toast.dismiss()
            toast.success('Confirm Success', {
                autoClose: 3000,
            })
        } else {
            if (!toast.isActive(toastId.current)) {
                toastId.current = toast.error('SomeThing wrong !!', {
                    autoClose: 3000,
                })
            }
        }
    }

    return (
        <div className="otp-container">
            <h1>
                Your OTP is : <span>{numberRandom}</span>
            </h1>
            <div className="OTP">
                <h1 className="OTP-title">Enter verification code</h1>
                <img src="pic.png" alt="" />
                <div className="OTP-checkNumber">
                    <input
                        type="text"
                        value={OtpNumber.input1}
                        maxLength={1}
                        pattern="[0-9]*"
                        onChange={(event) => handleChangeInput(event, 'input1')}
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault()
                            }
                        }}
                    />
                    <input
                        type="text"
                        onChange={(event) => handleChangeInput(event, 'input2')}
                        value={OtpNumber.input2}
                        maxLength={1}
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault()
                            }
                        }}
                    />
                    <input
                        type="text"
                        onChange={(event) => handleChangeInput(event, 'input3')}
                        value={OtpNumber.input3}
                        maxLength={1}
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault()
                            }
                        }}
                    />
                    <input
                        type="text"
                        onChange={(event) => handleChangeInput(event, 'input4')}
                        value={OtpNumber.input4}
                        maxLength={1}
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault()
                            }
                        }}
                    />
                </div>
                <div className="OTP-resend">
                    <p>
                        If you didn't receive a code! <span>Resend</span>
                    </p>
                </div>
                <div className="choice">
                    <button onClick={clearValueInput}>Clear</button>
                    <button
                        disabled={countDown === 0 ? true : false}
                        onClick={confirmOTP}
                    >
                        Verify
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Otp
