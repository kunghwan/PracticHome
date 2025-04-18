interface Notification {
  id: string; //! 누구에게 전달할 노티피케이션인지 파악
  followingId: string; // 내가 팔로우 한 사람의 아이디 //! 내가 팔로우 할 떄
  followerId: string | null; //? 내가 팔로잉 당할때는 ?
  created_at: Date;

  isRead: boolean;
}

const followingNotification1: Notification = {
  id: "asdsf",
  followerId: "follow 할사람의 id",
  followerId: null,
  created_at: new Date(),
  isRead: false,
};
const ref1 = dbService
  .collection(FBCollection.USERS)
  .doc("my id")
  .collection(FBCollection.NOTIFICATION)
  .add(followingNotification1);
const followingNotification2: Notification = {
  id: "asdsf",
  followingId: null,
  followerId: "my id",
  created_at: new Date(),
  isRead: false,
};

const ref2 = dbService
  .collection(FBCollection.USERS)
  .doc("follow 할 사람의 id")
  .collection(FBCollection.NOTIFICATION)
  .add(followingNotification1);

const url = ".post/[postId]";
