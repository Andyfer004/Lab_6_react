const NavBar = () => {
    const styles = {
        position: 'fixed', // Fijar la posición de la barra de navegación
        top: 0, // Colocarla en la parte superior
        // Asegurar que esté por encima de otros elementos
        background: 'black',
        color: 'white', // color de texto
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0%',
        alignItems: 'center',
        height: '10vh',
        width: '100%',
    };

    const logoStyles = {
        filter: 'invert(100%)',
        padding: '5%',
    };

    const h2Styles = {
        fontFamily: 'Roboto',
        fontSize: '1.5em', 
        fontWeight: 'bold',
        margin: '0',
        padding: '5%',
        color: 'white',
        textDecoration: 'none', 
    };
    
    return (
        <nav style={styles}>
            <img src='../media/logo_ferrari.png' alt="logo" width="40" height="40" style={logoStyles} />
            <a href='../index.html' style={h2Styles}>Home</a>
            <a href='../posts/post.html' style={h2Styles}>Posts</a>
            <a href='../cars/cars.html' style={h2Styles}>Cars</a>
        </nav>
    );
    
}

const Loading = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <h1>Loading...</h1>
        </div>
    );
};

const PostsLoader = () => {
    const [cars, setCars] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        fetch('http://3.129.191.211/api/22944/cars')
            .then(response => response.json())
            .then(data => {
                setCars(data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            {cars.map(car => (
                <Card key={car.id} car={car} />
            ))}
        </>
    );
};

const Card = ({ car }) => {
    const cardStyles = {
        boxSizing: 'border-box',
        padding: '2rem',
        margin: '5rem 0 0 0',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        transition: '0.3s',
        backgroundColor: 'rgba(138, 1, 0, 1)',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '1rem',
    };

    const textsStyles = {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Roboto',
    };

    const imageStyles = {
        maxHeight: '200px',
        maxWidth: '100%',
        borderRadius: '5px',
    };

    return (
        <div style={cardStyles}>
            <img src={`${car.imagen_base64}`} alt={car.modelo} style={imageStyles} />
            <div style={{ flex: '1' }}> {/* Div para alinear texto a la derecha */}
                <h3 style={textsStyles}>{car.marca} {car.modelo}</h3>
                <p style={textsStyles}>Año: {car.anio}</p>
                <p style={textsStyles}>{car.descripcion}</p>
            </div>
        </div>
    );
};

Card.propTypes = {
    car: PropTypes.shape({
        id: PropTypes.number,
        marca: PropTypes.string,
        modelo: PropTypes.string,
        anio: PropTypes.number,
        descripcion: PropTypes.string,
        imagen_base64: PropTypes.string,
    }),
};


const App = () => {


    const styles = {
        backgroundColor: 'White', // color de fondo
        overflow: 'hidden', // ocultar el desbordamiento del contenido
        minHeight: '100vh', // altura mínima para cubrir toda la pantalla
        display: 'block',
        position : 'relative',
        margin: 0,
        padding: 0,
    };
    return (
        <main style={styles}>
            <NavBar />
            <React.Suspense fallback={<Loading />}>
                <PostsLoader />
            </React.Suspense>
        </main>
    );
}


const root = document.getElementById('root');
ReactDOM.render(<App />, root);