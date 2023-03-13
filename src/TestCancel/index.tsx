import { useRef } from "react"
import cancelApi from "./cancelApi"

const TestCancel = () => {
    const [trigger, result] = cancelApi.useLazyGetInfoQuery()
    const requestRef = useRef<any>()

    const handleClickAbort = () => {
        requestRef.current?.abort()
    }

    const handleClickFetch = () => {
        const x = trigger(undefined)
        console.log({ x })
        requestRef.current = x

        setTimeout(handleClickAbort, 1000)
    }

    return (
        <div
            style={{
                width: "600px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
            }}
        >
            <button
                style={{
                    width: "120px",
                }}
                onClick={handleClickFetch}
            >
                Fetch
            </button>
            <button
                style={{
                    width: "120px",
                }}
                onClick={handleClickAbort}
            >
                Cancel
            </button>
            <p>{JSON.stringify(result, null, 4)}</p>
        </div>
    )
}

export default TestCancel
