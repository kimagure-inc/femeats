import React from 'react';

export default function Modal({ show, close, comment, btName, submit }) {
  return (
    <div>
      {show ? (
        <>
          {console.log(show, comment, btName, submit)}
          <div>
            <div onClick={(e) => e.stopPropagation()}>
              <main>{comment}</main>
              <footer>
                <button className='close' onClick={() => close()}>
                  キャンセル
                </button>
                <button className='submit' onClick={submit}>
                  {btName}
                </button>
              </footer>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
