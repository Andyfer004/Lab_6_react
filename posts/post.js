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
        fontSize: '2em', 
        fontWeight: 'bold',
        margin: '0',
        padding: '5%',
        color: 'white',
        textDecoration: 'none', 
    };
    
    return (
        <nav style={styles}>
            <img src='../media/logo_ferrari.png' alt="logo" width="50" height="50" style={logoStyles} />
            <a href='../posts/post.html' style={h2Styles}>Posts</a>
            <a href='../cars/cars.html' style={h2Styles}>Cars</a>
        </nav>
    );
    
}

const Card = ({ post }) => {
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
            <img src={`${post.imagen_url}`} alt={post.titulo} style={imageStyles} />
            <div style={{ flex: '1' }}> {/* Div para alinear texto a la derecha */}
                <h3 style={textsStyles}>{post.titulo} </h3>
                <p style={textsStyles}>{post.contenido}</p>
            </div>
        </div>
    );
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