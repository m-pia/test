import { NextRequest, NextResponse } from "next/server";

// A function to dynamically require the module
const getTf = () => eval('require("@tensorflow/tfjs-node")');

export async function POST(req: NextRequest) {
  const { x } = await req.json();

  if (x === undefined || typeof x !== 'number') {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  try {
    const tf = getTf();

    // Define a simple model.
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

    // Prepare the model for training: Specify the loss and the optimizer.
    model.compile({ loss: "meanSquaredError", optimizer: "sgd" });

    // Generate some synthetic data for training.
    const xs = tf.tensor2d([-1, 0, 1, 2, 3, 4], [6, 1]);
    const ys = tf.tensor2d([-3, -1, 1, 3, 5, 7], [6, 1]);

    // Train the model using the data.
    await model.fit(xs, ys, { epochs: 250 });

    // Use the model to do inference on a data point the model hasn't seen before:
    const result = model.predict(tf.tensor2d([x], [1, 1]));
    let prediction;
    if (Array.isArray(result)) {
        prediction = result[0].toString()
    } else {
        prediction = result.dataSync()[0];
    }

    return NextResponse.json({ prediction });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to make prediction' }, { status: 500 });
  }
}
