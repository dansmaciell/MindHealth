import { useState } from "react";
import Card from "../../_components/Card/Card.tsx";
import Button from "../../_components/Button/Button.tsx";
import Input from "../../_components/Input/Input.tsx";
import Modal from "../../_components/Modal/Modal.tsx";
import { FaHandHoldingHeart } from 'react-icons/fa';
import { FaHandshake } from 'react-icons/fa';
import { FaSmileBeam } from 'react-icons/fa';
import ApertoMao from "../../Image/aperto_mao.jpg"
import QR from "../../Image/qr.jpeg"

import styles from "./QueroApoiarStyle.module.scss";

export default function DonationPage() {
  const [donationValue, setDonationValue] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDonationModal = () => {
    if (donationValue <= 0) {
      !window.confirm("O Valor da doação não poder ser 0 ou menor que 0.")
      return;
    }

    setIsOpen(true);
  };

  return (
    <div className={styles.donationPage}>
      <div className={styles.header}>
        <div className={styles.imageContainer}>
          <img
            src={ApertoMao}
            alt="Imagem de doação"
            className={styles.image}
          />
        </div>
        <div className={styles.information}>
          <h1>Faça sua doação</h1>
          <p>
            Cada contribuição nos ajuda a oferecer educação de qualidade,
            alimentação nutritiva e cuidados essenciais para mais de 500 crianças
            em nossa comunidade.
          </p>
          <div className={styles.stats}>
            <Card
              message="Crianças atendidas"
              number={500}
              icon={<FaHandHoldingHeart size={30} />}
              messageColor="#000"
              numberColor="#32CD32"
              style={{ width: "150px", height: "150px" }}
              numberFontSize="20px"
              messageFontSize={16}
            />
            <Card
              message="Anos de impacto"
              number={15}
              icon={<FaSmileBeam size={30} />}
              messageColor="#000"
              numberColor="#FFD700"
              style={{ width: "150px", height: "150px" }}
              numberFontSize="20px"
              messageFontSize={16}
            />
            <Card
              message="Transparência"
              number={100}
              icon={<FaHandshake size={30} />}
              messageColor="#000"
              numberColor="#1E90FF"
              style={{ width: "150px", height: "150px" }}
              numberFontSize="20px"
              messageFontSize={16}
            />
          </div>
          <div className={styles.donationForm}>
            <h3>Escolha o valor da sua doação:</h3>
            <div className={styles.donationAmounts}>
              <Button text="R$ 25" onClick={() => setDonationValue(25)} />
              <Button text="R$ 50" onClick={() => setDonationValue(50)} />
              <Button text="R$ 100" onClick={() => setDonationValue(100)} />
              <Button text="R$ 250" onClick={() => setDonationValue(250)} />
              <Button text="R$ 500" onClick={() => setDonationValue(500)} />
            </div>
            <label className="mb-2">Ou digite outro valor</label>
            <Input
              value={donationValue.toString()}
              type="number"
            />
            <Button
              text="Doar"
              style={{ marginTop: "20px" }}
              onClick={handleOpenDonationModal}
            />
            {isOpen && (
              <Modal
                onClose={() => setIsOpen(false)}
                title="Faça aqui sua doação via Pix"
                modalStyle={{ width: 500, height: 370, marginTop: 20 }}
              >
                <p style={{ fontSize: 18 }}>Pague neste QRCode abaixo</p>
                <img
                  src={QR}
                  alt="qrcode"
                  style={{ width: "180px", height: "180px" }}
                />
                <p className="mt-3">Valor: R$ {donationValue.toString()},00</p>
              </Modal>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
