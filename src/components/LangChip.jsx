export default function LangChip({className, name , color , backgroundColor}){

    const styles = {
        backgroundColor: backgroundColor,
        color: color
    }
    return (
        <span className={className} style={styles}>{name}</span>
    )
}