import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import cancelApi from "./cancelApi"
import { debounce } from "lodash"

const Input = () => {
    const [value, setValue] = useState("")
    const lastRequestRef = useRef<any>()
    const [trigger] = cancelApi.useLazyGetInfoQuery()
    const triggerDebounced = useMemo(() => debounce(trigger, 300), [trigger])

    const fetcher = useCallback(() => {
        lastRequestRef.current?.abort()
        lastRequestRef.current = triggerDebounced(undefined)
    }, [])

    useEffect(() => {
        fetcher()
    }, [value, fetcher])

    return <input value={value} onChange={(e) => setValue(e.target.value)} />
}

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

            <Input />
            <p>{JSON.stringify(result, null, 4)}</p>
        </div>
    )
}

export default TestCancel
