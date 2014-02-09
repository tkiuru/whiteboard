package com.jobapplication.whiteboard

import org.scalatra._
import scalate.ScalateSupport
import compat.Platform.currentTime
import java.util.Random

class WhiteboardServlet extends WhiteboardStack {
  get("/addition/:positionX/:positionY/:text") {
    println("Got addition:" +
        "position x: "+  {params("positionX")} +
        ", position y " + {params("positionY")} +
        ", text " + {params("text")})
  }

  get("/changes") {
     if (currentTime % 5 == 0) {
        "[" +
            getOneChangedElement + "," +
            getOneChangedElement + "," +
            getOneChangedElement + "," +
            getOneChangedElement +
            "]"
     } else ""
  }

  def generateRandomNumber(min: Int, max: Int): Int = {
      val rand = new Random();
      min + rand.nextInt( max - min + 1 );
  }

  def getOneChangedElement: String = {
    "{\"positionX\":\"" + generateRandomNumber(0, 1000) +
            "\", \"positionY\":\"" + generateRandomNumber(0, 1000) +
            "\",\"text\":\"" + generateRandomNumber(0, 9).toString + "\"}"
  }
}
