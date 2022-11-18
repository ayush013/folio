// Copyright Ayush Singh 2021,2022. All Rights Reserved.
// Project: folio
// Author contact: https://www.linkedin.com/in/alphaayush/
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { NO_MOTION_PREFERENCE_QUERY } from "pages";
import { useEffect, useState } from "react";

const ProgressIndicator = () => {
  const [progress, setProgress] = useState(0);

  const calculateProgress = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = winScroll / height;
    setProgress(scrolled);
  };

  useEffect(() => {
    const { matches } = window.matchMedia(NO_MOTION_PREFERENCE_QUERY);

    matches && window.addEventListener("scroll", calculateProgress);

    return () => window.removeEventListener("scroll", calculateProgress);
  }, [progress]);

  return (
    <div className="progress w-full fixed top-0 z-50">
      <div
        className="progress-bar"
        style={{ transform: `scaleX(${progress})` }}
      ></div>
    </div>
  );
};

export default ProgressIndicator;
