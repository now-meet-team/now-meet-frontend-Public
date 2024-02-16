import {useState, useEffect} from 'react';

const useShowProfileOnFirstMessage = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [messageCount, setMessageCount] = useState(0);

  const sendMessageCount = () => {
    setMessageCount(prevCount => prevCount + 1);
  };

  useEffect(() => {
    if (messageCount === 0) {
      setShowProfile(true);
    } else if (messageCount > 1) {
      setShowProfile(false);
    }

    const timer = setTimeout(() => {
      setMessageCount(0);
    }, 3000);

    return () => clearTimeout(timer);
  }, [messageCount]);

  return {showProfile, sendMessageCount};
};

export default useShowProfileOnFirstMessage;
