import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");    // Save input data
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");


    //delaypara functionality
    const delayPara = (index, nextWord) => {
        setTimeout( function() {
            setResultData(prev=> prev + nextWord);
        }, 75*index);
    }

    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }

    const onSent = async (prompt) => {
        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response;

        if (prompt !== undefined) {
            response = await run(prompt)
            setRecentPrompt(prompt)
        }
        else {
            setPrevPrompts(prev => [...prev, input])
            setRecentPrompt(input)
            response = await run(input)
        }

        try {

            // Initialize newResponse to an empty string
            let newResponse = "";

            // Split the response by "**"
            let responseArray = response.split("**");

            // Process each part of the response
            for (let i = 0; i < responseArray.length; i++) {
                if (i === 0 || i % 2 !== 1) {
                    newResponse += responseArray[i];
                } else {
                    newResponse += "<b>" + responseArray[i] + "</b>";
                }
            }

            // Replace "*" with "<br>" in newResponse
            const newResponse2 = newResponse.split("*").join("<br>");

            // Set the processed result data
            let newResponseArray = newResponse2.split(" ");
            for(let i=0; i<newResponseArray.length; i++) {
                const nextWord = newResponseArray[i];
                delayPara(i, nextWord + " ")
            }

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false); // End loading
            setInput(""); // Clear input field
        }
    }

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput, // Include this in context
        newChat,
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
}

export default ContextProvider;
