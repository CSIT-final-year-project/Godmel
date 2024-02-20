const FooterComponent = () => {
    const date = new Date();
    const year = date.getFullYear();
    let display = 2023;
    if(year !== display){
        display += "-"+year
    }
    return (<>
        <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid px-4">
                <div className="d-flex align-items-center justify-content-between small">
                    <div className="text-muted">Copyright &copy; Penguins {display}</div>
                </div>
            </div>
        </footer>
    </>)
}

export default FooterComponent