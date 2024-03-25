"use client";
import { useCallback, useMemo, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import Modal from "react-modal";

import { ErrorMessage } from "@hookform/error-message";
import { FaEdit } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import useSWR from "swr";

import { GetUserData } from "@/app/api/v1/get/user/[id]/route";
import Loading from "@/components/Loading";
import TankaViewer from "@/components/TankaViewer";
import { useUserStore } from "@/store/user";
import { CustomTanka } from "@/types";
import fetcher from "@lib/fetcher";

import styles from "./style.module.scss";

interface FormInputs {
  name: string;
  message: string;
}

type ProfileProps = {
  userId: string;
};

function Profile({ userId }: ProfileProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<"delete" | "update" | null>(null);
  const [selectedTanka, setSelectedTanka] = useState<CustomTanka | null>(null);
  const { userStore } = useUserStore();
  const { data, isLoading } = useSWR<GetUserData>(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/get/user/${userId}`,
    fetcher,
    {
      refreshInterval: 5000,
    },
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInputs>();

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setSelectedTanka(null);
    setModalType(null);
  }, []);

  const showDeleteModal = useCallback(
    (tanka: CustomTanka) => {
      setSelectedTanka(tanka);
      setModalType("delete");
      openModal();
    },
    [openModal],
  );

  const showProfileUpdateModal = useCallback(() => {
    setModalType("update");
    openModal();
  }, [openModal]);

  const deleteTanka = async () => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/v1/delete/tanka/${selectedTanka?.id}`,
      );

      toast.success("短歌を削除しました！ 😼");
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error("削除に失敗しました...。 😿");
    }
  };

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/v1/update/user/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: userId,
            name: data.name,
            message: data.message,
          }),
        },
      );

      toast.success("プロフィールを更新しました！ 😼");
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error("プロフィールの更新に失敗しました！ 🙀");
    }
  };

  const items = useMemo(
    () =>
      data?.tankas?.map((tanka) => (
        <div key={tanka.id} className={styles["tanka"]}>
          {userStore.user.id === tanka.userId && (
            <span className={styles["delete-icon"]}>
              <TiDelete
                className={styles["icon"]}
                onClick={() => showDeleteModal(tanka)}
              />
            </span>
          )}
          <TankaViewer tanka={tanka} isActiveLink={false} />
        </div>
      )) || [],
    [data?.tankas, showDeleteModal, userStore.user.id],
  );

  // 短歌削除用モーダル
  const DeleteModal = () => (
    <div className={styles["delete-modal"]}>
      <h1 className={styles["message"]}>こちらの短歌を削除しますか？</h1>
      {selectedTanka && (
        <TankaViewer tanka={selectedTanka} isActiveLink={false} />
      )}
      <div className={styles["modal__buttons"]}>
        <button className={styles["delete"]} onClick={() => deleteTanka()}>
          削除
        </button>
        <button className={styles["back"]} onClick={() => closeModal()}>
          戻る
        </button>
      </div>
    </div>
  );

  // プロフィール更新用モーダル
  const UpdateModal = () => (
    <div className={styles["update-modal"]}>
      <form className={styles["update-form"]} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles["update-form__field"]}>
          <div className={styles["label"]}>
            <label htmlFor="name">ユーザー名</label>
            <ErrorMessage
              errors={errors}
              name="name"
              render={({ message }) => (
                <p className={styles["error-message"]}>{message}</p>
              )}
            />
          </div>
          <input
            id="name"
            value={data?.user?.name}
            placeholder="ユー ザー名を入力してください"
            {...register("name", {
              required: "ユーザー名が入力されていません！",
              maxLength: {
                value: 10,
                message: "ユーザー名は10文字以内で入力してください！",
              },
            })}
          />
        </div>
        <div className={styles["update-form__field"]}>
          <div className={styles["label"]}>
            <label htmlFor="message">ひとこと</label>
            <ErrorMessage
              name="message"
              errors={errors}
              render={({ message }) => (
                <div className={styles["error-message"]}>{message}</div>
              )}
            />
          </div>
          <textarea
            id="message"
            rows={3}
            placeholder={"ひとことを入力してください"}
            {...register("message", {
              maxLength: {
                value: 30,
                message: "メッセージは30文字以内で入力してください！",
              },
            })}
          >
            {data?.user?.message || ""}
          </textarea>
        </div>
        <div className={styles["modal__buttons"]}>
          <button type="submit" className={styles["update"]}>
            更新
          </button>
          <button className={styles["back"]} onClick={() => closeModal()}>
            戻る
          </button>
        </div>
      </form>
    </div>
  );

  // 読み込み中
  if (isLoading || !userId) {
    return <Loading />;
  }

  return (
    <div className={styles["wrapper"]}>
      <main className={styles["profile"]}>
        <h1 className={styles["profile__title"]}>プロフィール</h1>
        <div className={styles["profile__info"]}>
          {userStore.user.id === userId && (
            <FaEdit
              className={styles["edit-icon"]}
              onClick={() => {
                showProfileUpdateModal();
              }}
            />
          )}
          <div className={styles["profile__info__fields"]}>
            <div className={styles["column"]}>ユーザー名</div>
            <div className={styles["value"]}>{data?.user?.name}</div>
          </div>
          <div className={styles["profile__info__fields"]}>
            <div className={styles["column"]}>ひとこと</div>
            <div className={styles["value"]}>{data?.user?.message}</div>
          </div>
        </div>
        <h1 className={styles["profile__title"]}>短歌一覧</h1>
        <div className={styles["profile__tankas"]}>{items}</div>
      </main>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className={styles["modal"]}
        ariaHideApp={false} // warning　対策
      >
        {modalType === "delete" && <DeleteModal />}
        {modalType === "update" && <UpdateModal />}
      </Modal>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
}

export default Profile;
