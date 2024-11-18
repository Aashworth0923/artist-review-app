import { Container, Row, Col, Button } from 'reactstrap';
import ArtistCard from '../../components/ArtistCard/artistCard';
import { selectedArtistById } from '../features/campsites/artistSlice';
import ArtistDetail from '../../components/ArtistDetail/artistDetail';
import { useState } from 'react';

const ArtistDirectoryPage = () => {
    const [artistId, setArtistId] = useState(0);
    const selectedArtist = selectedArtistById(artistId);
    return (
        <Container>
            <Row>
                <Col sm='5' md='7'>
                    <ArtistCard setArtistId={setArtistId}/>
                </Col>
                <Col sm='7' md='5'>
                    <ArtistDetail campsite={selectedArtist} />
                </Col>
            </Row>
        </Container>
    );
};

export default ArtistDirectoryPage;