interface ContainerProps{
    children: React.ReactNode;
}

const Container:React.FC<ContainerProps> = ({
    children
}) => {
    return(
        <div className="mx-4 sm:mx-6 lg:mx-8 max-w-7xl">
            {children}
        </div>
    )
}

export default Container;