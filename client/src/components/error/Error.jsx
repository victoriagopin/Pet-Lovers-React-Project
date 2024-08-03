import { Link } from 'react-router-dom';
import styles from './Error.module.css';

export default function Error(){

    return (
        <section className="pet_section layout_padding">
            <div className="container">
                <div className="row">
                 <div className="col-md-6">
                    <div className="img-box">
                    <img src="images/slider-img.png" alt="" />
                </div>
            </div>
            <div className={`col-md-6 ${styles.error}`}>
              <div className="detail-box">
                </div>
                <p>
                  404 An error occured
                </p>
                <div className="btn-box">
                  <Link to={'/'}>
                    <span>
                      Go back to home
                    </span>
                    <img src="images/link-arrow.png" alt="" />
                    </Link>
                </div>
              </div>
            </div>
          </div>
      </section>
    )
}