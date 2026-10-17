import { useParams } from 'react-router-dom';

export default function WorkDetail() {
    const { slug } = useParams();
    return <main><h1>{slug}</h1></main>
}