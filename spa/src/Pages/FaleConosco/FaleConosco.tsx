import Input from '../../_components/Input/Input.tsx';
import Button from '../../_components/Button/Button.tsx';
import TextArea from '../../_components/TextArea/TextArea.tsx';
import styles from './FaleConoscoStyle.module.scss'

export default function FaleConosco(){

    return (
        <div className={styles.contactContainer}>
            <div className="d-flex justify-content-center">
                <div className={`contact-form-wrapper col-lg-8 col-md-10 ${styles.contactCard}`}>
                    <h1 className={styles.contactTitle}>Envie-nos uma mensagem!</h1>
                    <form>
                        <Input
                            placeholder="Seu nome completo"
                            type="text"
                            required
                            className="mb-4"
                        />

                        <Input
                            placeholder="Seu e-mail"
                            type="email"
                            required
                            className="mb-4"
                        />

                        <Input
                            placeholder="Assunto da mensagem"
                            type="text"
                            required
                            className="mb-4"
                        />

                        <TextArea
                            placeholder="Mensagem"
                            required
                            rows={5}
                        />

                        <div className="submit-container mb-5">
                            <Button
                                text="Enviar Mensagem"
                                type="submit"
                                style={{
                                    maxWidth: 150,
                                    height: 35,
                                    whiteSpace: 'nowrap'
                                }}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );


};
