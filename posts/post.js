const NavBar = () => {
    const styles = {
        position: 'fixed', // Fijar la posición de la barra de navegación
        top: 0, // Colocarla en la parte superior  
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
        height:'auto',
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

const Card = ({ post }) => {
    const [isColumnLayout, setIsColumnLayout] = React.useState(false);
    const cardStyles = {
        boxSizing: 'border-box',
        padding: '2%',
        margin: '5rem 0 0 0',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        transition: '0.3s',
        backgroundColor: 'rgba(138, 1, 0, 1)',
        display: 'flex',
        alignItems: isColumnLayout ? 'center' : 'center', // Centrar contenido verticalmente o al inicio
        flexDirection: isColumnLayout ? 'column' : 'row', 
        gap: '1rem',
    };

    const TitleStyles = {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Roboto',
        flex: '1',
    };

    const textsStyles = {
        color: 'white',
        textAlign: 'justify',
        fontFamily: 'Roboto',
        opacity: '0.8',
        flex: '1',
    };

    const imageStyles = {
        maxHeight: '300px',
        maxWidth: '100%',
        borderRadius: '5px',
        flex: '1',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const handleResize = () => {
        setIsColumnLayout(window.innerWidth <= 768); // Cambiar a disposición de columna si el ancho es menor
    };

    React.useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div style={cardStyles}>
            <img src={`${post.imagen_url}`} alt={post.titulo} style={imageStyles} />
            <div style={{ flex: '1' }}> {/* Div para alinear texto a la derecha */}
                <h3 style={TitleStyles}>{post.titulo} </h3>
                <p style={textsStyles}>{post.contenido}</p>
            </div>
        </div>
    );
};

Card.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number,
        titulo: PropTypes.string,
        contenido: PropTypes.string,
        imagen_url: PropTypes.string,
        carro_id: PropTypes.null,
    }),
};

const App = () => {

    const [posts, setPosts] = React.useState([]);

    React.useEffect(() => {
        fetch('http://3.129.191.211/api/22944/posts')
            .then(response => response.json())
            .then(data => setPosts(data))
            .catch(error => console.error(error));
    }, []);

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
            {posts.map(post => (
                <Card key={posts.id} post={post} />
            ))}
        </main>
    );
}


const root = document.getElementById('root');
ReactDOM.render(<App />, root);