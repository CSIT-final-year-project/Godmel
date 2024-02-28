const FooterComponent = () => {
    const date = new Date()
    const year = date.getFullYear()
    let display = 2023;
    if(year !== display) {
        // 2023-2025
        display += "-"+year
    }
  return (
    <>
      <footer className="py-4 bg-light mt-auto">
        <div className="container-fluid px-4">
          <div className="d-flex align-items-center justify-content-between small">
            <div className="text-muted">
                Copyright &copy; Smart Kishan App {display}
            </div>     
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterComponent;