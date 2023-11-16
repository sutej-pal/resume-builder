interface SectionHeaderProps {
    heading: string;
    subHeading: string
}

const SectionHeader = ({ heading = '', subHeading = '' }: SectionHeaderProps) => {
    return (
        <div className="my-3">
            <h4>{heading}</h4>
            <div className="text-secondary fs-6">{subHeading}</div>
        </div>
    )
}

export default SectionHeader;