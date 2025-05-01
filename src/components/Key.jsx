export default function Key({list , disabled , className,guessedKey, text}){

    
    return (
        <button 
        disabled={disabled}
        aria-disabled={list.includes(text)}
        aria-label={`letter ${text}`}
        className={`${className}`}
        onClick={() => guessedKey(text)}>
            {text.toUpperCase()}

        </button>
    )
}