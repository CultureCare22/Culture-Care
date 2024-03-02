function Router() {
    const Layout = () => {
        return (
            <>
                <Header />
                <Footer />
            </>
        )
    }

    const BrowserRoutes = () => {
        return (
            <BrowserRoutes>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path="confirmation-page/id" element={<ComfirmationPage />}></Route>
                    </Route>
                </Routes>
            </BrowserRoutes>
        )
    }
}

export default Router