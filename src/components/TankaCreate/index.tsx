"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import Modal from "react-modal";

import { ErrorMessage } from "@hookform/error-message";

import TankaViewer from "@/components/TankaViewer";
import { useUserStore } from "@/store/user";

import styles from "./style.module.scss";

interface FormInputs {
  theme: string;
  ku1: string;
  ku2: string;
  ku3: string;
  ku4: string;
  ku5: string;
}

function TankaCreateForm() {
  const [isOpen, setIsOpen] = useState(false);
  const { userStore } = useUserStore();

  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormInputs>();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const onSubmit = () => {
    // React Hooks Form のバリデーションを通過したらモーダルを開く
    openModal();
  };

  const createTanka = async () => {
    try {
      const data = getValues();
      await fetch("/api/v1/create/tanka", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userStore.user.id,
          ...data,
        }),
      });

      toast.success("短歌を作成しました！ 😼");
      closeModal();
      reset();
    } catch (err) {
      toast.error("作成に失敗しました...。 😿");
    }
  };

  const tankaRule = (ku: string, min: number, max: number) => {
    return {
      required: `${ku}が入力されていません！`,
      minLength: {
        value: min,
        message: `${ku}の字足らずは${min}文字まで！`,
      },
      maxLength: {
        value: max,
        message: `${ku}の字余りは${max}文字まで！`,
      },
    };
  };

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["container"]}>
        <form
          className={styles["create-form"]}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles["create-form__field"]}>
            <div className={styles["label"]}>
              <label htmlFor="theme">テーマ</label>
              <ErrorMessage
                errors={errors}
                name="theme"
                render={({ message }) => (
                  <p className={styles["error-message"]}>{message}</p>
                )}
              />
            </div>
            <input
              id="theme"
              placeholder="例: 春の訪れ"
              {...register("theme", {
                required: "テーマが入力されていません！",
                maxLength: {
                  value: 15,
                  message: "テーマは15文字以内で入力してください！",
                },
              })}
            />
          </div>
          <div className={styles["create-form__field"]}>
            <div className={styles["label"]}>
              <label htmlFor="ku1">第一句</label>
              <ErrorMessage
                name="ku1"
                errors={errors}
                render={({ message }) => (
                  <div className={styles["error-message"]}>{message}</div>
                )}
              />
            </div>
            <input
              id="ku1"
              placeholder="例: わが園に"
              {...register("ku1", tankaRule("第一句", 2, 8))}
            />
          </div>
          <div className={styles["create-form__field"]}>
            <div className={styles["label"]}>
              <label htmlFor="ku2">第二句</label>
              <ErrorMessage
                name="ku2"
                errors={errors}
                render={({ message }) => (
                  <div className={styles["error-message"]}>{message}</div>
                )}
              />
            </div>
            <input
              id="ku2"
              placeholder="例: 梅の花散る"
              {...register("ku2", tankaRule("第二句", 4, 10))}
            />
          </div>
          <div className={styles["create-form__field"]}>
            <div className={styles["label"]}>
              <label htmlFor="">第三句</label>
              <ErrorMessage
                name="ku3"
                errors={errors}
                render={({ message }) => (
                  <div className={styles["error-message"]}>{message}</div>
                )}
              />
            </div>
            <input
              id="ku3"
              placeholder="例: ひさかたの"
              {...register("ku3", tankaRule("第三句", 2, 8))}
            />
          </div>
          <div className={styles["create-form__field"]}>
            <div className={styles["label"]}>
              <label htmlFor="ku4">第四句</label>
              <ErrorMessage
                name="ku4"
                errors={errors}
                render={({ message }) => (
                  <div className={styles["error-message"]}>{message}</div>
                )}
              />
            </div>
            <input
              id="ku4"
              placeholder="例: 天より雪の"
              {...register("ku4", tankaRule("第四句", 4, 10))}
            />
          </div>
          <div className={styles["create-form__field"]}>
            <div className={styles["label"]}>
              <label htmlFor="ku5">第五句</label>
              <ErrorMessage
                name="ku5"
                errors={errors}
                render={({ message }) => (
                  <div className={styles["error-message"]}>{message}</div>
                )}
              />
            </div>
            <input
              id="ku5"
              placeholder="例: 流れ来るかも"
              {...register("ku5", tankaRule("第五句", 4, 10))}
            />
          </div>
          <div className={styles["create-form__submit"]}>
            <button type="submit" className={styles["confirmation"]}>
              確認
            </button>
          </div>
        </form>
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className={styles["modal"]}
        contentLabel="tanka preview"
        ariaHideApp={false} // warning　対策
      >
        <TankaViewer
          tanka={{
            ...getValues(),
            user: { name: userStore.user?.name },
          }}
          isActiveLink={false}
        />
        <div className={styles["modal__buttons"]}>
          <button className={styles["regist"]} onClick={() => createTanka()}>
            作成
          </button>
          <button className={styles["back"]} onClick={() => closeModal()}>
            戻る
          </button>
        </div>
      </Modal>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
}

export default TankaCreateForm;
