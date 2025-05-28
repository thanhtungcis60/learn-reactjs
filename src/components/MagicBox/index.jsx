import useMagicColor from '../../hooks/useMagicColor';
import './MagicBox.scss';

MagicBox.propTypes = {

};

function MagicBox(props) {
    const color = useMagicColor();
    return (
        <div
            className='magic-box'
            style={{ backgroundColor: color }}>

        </div>
    );
}

export default MagicBox;