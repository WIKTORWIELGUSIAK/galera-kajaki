/** @format */

import { ArrowLeft, ArrowRight } from "../../shared";
import { useState } from "../../shared";
import { ModalInterface } from "../../interfaces";
import styles from "./Modal.module.css";

const Modal = ({ setFirstOpen }: ModalInterface) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pages = [
    {
      id: 1,
      header: "Witam na Galerze!",
      content:
        "W tym krótkim poradniku przejdziemy przez wszystkie główne funkcje tej aplikacji",
      tip: 'Jeśli chcesz od razu zacząć, możesz nacisnąć przycisk "Pomiń" poniżej. W przeciwnym wypadku naciśnij strzałkę w prawo',
    },
    {
      id: 2,
      header: "Czym jest Galera?",
      content:
        "Galera jest to strona stworzona z myślą o tym aby można było na niej wytyczyć najkrótszą trasę pomiędzy punktami na wybranych rzekach",
      tip: "Trasa jest wyszukiwana wyłącznie na podstawie rzek dodanych do wyszukiwania",
    },
    {
      id: 3,
      header: "Dodanie trasy",
      content:
        "Na początek należy dodać pierwszą trasę na mapie aby było co wyświetlić",
      tip: 'Aby przejść do trybu dodawania wystarczy nacisnąć przycisk "Dodaj" przedstawiony na zdjęciu poniżej',
      photo:
        "https://drive.google.com/uc?export=view&id=1drDN7HwwY7HG2w-BqJpGcLMeXkG_cftR",
    },
    {
      id: 4,
      header: "Dodanie rzek",
      content:
        "Następnym etapem jest dodanie rzek, po których ma przebiegać trasa",
      tip: "Najlepiej wybrać rzeki, które się ze sobą łączą ponieważ tylko na takich zostanie wytyczona trasa",
      photo:
        "https://drive.google.com/uc?export=view&id=1d9WTY2SfBcMAzyyr0y-A5FjHRrZGQQuA",
    },
    {
      id: 5,
      header: "Dodanie trasy",
      content:
        "Ostatnim etapem dodawania trasy jest nadanie jej nazwy, można również dodać do niej opis, oraz należy nadać jej kolor",
      tip: "Lepiej nie dodawać wielu tras z tym samym kolorem ponieważ ciężko je będzie na pierwszy rzut oka odróżnić :)",
      photo:
        "https://drive.google.com/uc?export=view&id=1xlc4gfZVPnSpCGfuGieBOiB2xGJIW7fX",
    },
    {
      id: 6,
      header: "Edycja trasy",
      content:
        "Jeżeli zobaczysz taki przycisk zaznaczony ramką poniżej jak poniżej w prawym górnym rogu panelu to po kliknięciu go przechodzisz w tryb edycji trasy",
      tip: "Wygląda on tak samo jak tryb dodawania więc nie będę go ponownie opisywał",
      photo:
        "https://drive.google.com/uc?export=view&id=19GuqcJeB9QQylCZ34HDwj3ZWxTt1Fe3Z",
      warrning:
        "Na koniec chciałbym zaznaczyć, że na niektórych trasach rzek występują dziury co jest spowodowane niedokładnością danych odnośnie ich przebiegu zaciągniętych ze strony państwowej. Są to jednak najdokładniejsze dane dostępne w internecie na ten moment.",
    },
  ];
  const handleClose = () => {
    // Code to close the modal
    setFirstOpen("false");
  };

  const handleNext = () => {
    setCurrentPage(Math.min(currentPage + 1, pages.length));
  };

  const handlePrev = () => {
    setCurrentPage(Math.max(currentPage - 1, 1));
  };
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <p className={styles.counter}>
          {currentPage}/{pages.length}
        </p>
        <h1 className={styles.header}>{pages[currentPage - 1].header}</h1>
        <div className={styles.modalContent}>
          <p className={styles.content}>{pages[currentPage - 1].content}</p>
          <p className={styles.tip}>{pages[currentPage - 1].tip}</p>
          {pages[currentPage - 1].photo ? (
            <img
              className={styles.img}
              src={pages[currentPage - 1].photo}
              alt={pages[currentPage - 1].photo}
            />
          ) : null}
          {pages[currentPage - 1].warrning ? (
            <p className={styles.warrning}>{pages[currentPage - 1].warrning}</p>
          ) : null}
        </div>
        <div className={styles.modalFooter}>
          <div
            className={`${styles.arrowButton} ${styles.left}`}
            onClick={handlePrev}
          >
            <ArrowLeft size={48} />
          </div>
          <div
            className={`${styles.arrowButton} ${styles.right}`}
            onClick={handleNext}
          >
            <ArrowRight size={48} />
          </div>
          <button onClick={handleClose} className={styles.skipButton}>
            {currentPage !== pages.length ? "Pomiń" : "Zakończ"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
